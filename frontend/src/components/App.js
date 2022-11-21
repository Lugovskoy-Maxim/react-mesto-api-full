import { useState, useEffect } from "react";

import { Route, Switch, useHistory, Redirect } from "react-router-dom";

import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoPopup from "./InfoPopup";

import { api } from "../Utils/api";
import * as auth from "../Utils/auth";
import ProtectedRoute from "./ProtectedRoute";

import { CurrentUserContext } from "../context/CurrentUserContext";
import { LoadingPopupContext } from "../context/LoadingPopupContext";

import Login from "./Login";
import Register from "./Register";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  const [isLoadingPopup, setLoadingPopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPreviewPopupOpen, setPreviewPopupOpen] = useState(false);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    link: "",
    title: "",
  });
  const [toDeleteCard, setDeleteCardId] = useState({ id: "" });
  const history = useHistory();



  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPopupOpen(true);
  };
  const handleCardDeleteClick = (card) => {
    setDeleteCardId({ id: card._id });
    setDeleteCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPopupOpen(false);
    setPreviewPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({ link: "", title: "" });
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then((data) => {
          setCurrentUser(data[0]);
          setEmail(data[0].email);
          setCards(data[1].data);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, [setCards, loggedIn]);

  const handlePreviewPopupClick = (src, alt) => {
    setSelectedCard({
      link: src,
      title: alt,
    });
    setPreviewPopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    return api
      .changeStatusLikeCard(card._id, isLiked)
      .then((currentCard) => {
        setCards(
          cards.map((item) => (item._id === card._id ? currentCard : item))
        );
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  };

  const handleAddPlaceSubmit = (link, title) => {
    setLoadingPopup(true);
    return api
      .addCard(link, title)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        setAddPopupOpen(false);
      })
      .finally(() => {
        setLoadingPopup(false);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  };

  const handleEditProfileSubmit = (userName, userAbout) => {
    setLoadingPopup(true);
    return api
      .setUserInfo(userName, userAbout)
      .then((user) => {
        console.log(user);
        setCurrentUser(user.data);
        setEditProfilePopupOpen(false);
      })
      .finally(() => {
        setLoadingPopup(false);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  };

  const handleEditAvatarSubmit = (data) => {
    setLoadingPopup(true);
    return api
      .setUserAvatar(data)
      .then((user) => {
        setCurrentUser(user.data);
        setEditAvatarPopupOpen(false);
      })
      .finally(() => {
        setLoadingPopup(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const handleDeleteCardSubmit = (deleteCard) => {
    setLoadingPopup(true);
    return api
      .deleteCard(deleteCard.id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== deleteCard.id));
        setDeleteCardPopupOpen(false);
      })
      .finally(() => {
        setLoadingPopup(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  function handleSingnOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setEmail("");
  }

  function handleAuthorize(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          handleTokenCheck();
          setIsDone(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsDone(false);
        setIsInfoPopupOpen(true);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsDone(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsDone(false);
      })
      .finally(setIsInfoPopupOpen(true));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header onlogin={loggedIn} email={email} onSignOut={handleSingnOut} />
          <Switch>
            <Route path="/signin">
              <Login onLogin={handleAuthorize} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <ProtectedRoute
              loggedIn={loggedIn}
              exact
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              handlePreviewPopupClick={handlePreviewPopupClick}
              onCardDelete={handleCardDeleteClick}
            />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>

          <Footer />

          <LoadingPopupContext.Provider value={isLoadingPopup}>
            <ImagePopup
              card={selectedCard}
              isOpened={isPreviewPopupOpen}
              isClosed={closeAllPopups}
            ></ImagePopup>

            <EditAvatarPopup
              isOpened={isEditAvatarPopupOpen}
              isClosed={closeAllPopups}
              onEditAvatar={handleEditAvatarSubmit}
            />

            <AddPlacePopup
              isOpened={isAddPopupOpen}
              isClosed={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditProfilePopup
              isOpened={isEditProfilePopupOpen}
              isClosed={closeAllPopups}
              onEditProfile={handleEditProfileSubmit}
            />

            <InfoPopup
              isOpened={isInfoPopupOpen}
              isClosed={closeAllPopups}
              status={isDone}
            />

            <DeleteCardPopup
              isOpened={isDeleteCardPopupOpen}
              isClosed={closeAllPopups}
              onDeletePhoto={handleDeleteCardSubmit}
              card={toDeleteCard}
            />
          </LoadingPopupContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
