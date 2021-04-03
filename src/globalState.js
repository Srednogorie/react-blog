import React, {createContext, useReducer, useContext} from "react";

/* Define a context and a reducer for updating the context */
const GlobalStateContext = createContext();

const initialState = {
    // Article
    article: {
      categories: [],
      activeCategory: 0,
      nonAuthArticles: [],
      currentArticle: null,
      authArticles: [],
      authArticlesCurrent: null,
      editArticle: null,
      deleteArticle: null
    },
    // Modal management
    modal: {
        modalIsOpen: false,
        modalContent: null,
    },
    // Manage
    manage: {
      isAuthenticated: null,
      toggleMenu: false,
    },
    // Login
    login: {
        errors: {},
        loading: false,
    },
    // Signin
    signup: {
        errors: {},
        loading: false
    },
    // Home page
    home: {
        render: false,
        uiLoading: true,
        imageLoading: false
    },
    // Account
    account: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        username: '',
        country: '',
        profilePicture: '',
        buttonLoading: false,
        imageError: '',
        profileCompleted: false,
        defaultAvatar: "https://firebasestorage.googleapis.com/v0/b/mysoftexam.appspot.com/o/profile_images%2FstackSubDefaultAvatar.png?alt=media&token=4c923092-ad3a-41fa-be2f-f0d48e5a73c4"
    }
};

const globalStateReducer = (state, action) => {
    switch (action.type) {
        // Article
        case "CATEGORIES":
            return {...state, article: {...state.article, categories: action.payload}};
        case "ACTIVE_CATEGORY":
            return {...state, article: {...state.article, activeCategory: action.payload}};
        case "NON_AUTH_ARTICLES":
            return {...state, article: {...state.article, nonAuthArticles: action.payload}};
        case "CURRENT_ARTICLE":
            return {...state, article: {...state.article, currentArticle: action.payload}};
        case "AUTH_ARTICLES":
            return {...state, article: {...state.article, authArticles: action.payload}};
        case "AUTH_ARTICLES_CURRENT":
            return {...state, article: {...state.article, authArticlesCurrent: action.payload}};
        case "EDIT_ARTICLE":
            return {...state, article: {...state.article, editArticle: action.payload}};
        case "DELETE_ARTICLE":
            return {...state, article: {...state.article, deleteArticle: action.payload}};
        // Modal
        case "MODAL_IS_OPEN":
            return {...state, modal: {...state.modal, modalIsOpen: action.payload}};
        case "MODAL_CONTENT":
            return {...state, modal: {...state.modal, modalContent: action.payload}};
        // Manage
        case "IS_AUTHENTICATED":
            return {...state, manage: {...state.manage, isAuthenticated: action.payload}};
        case "TOGGLE_MENU":
            return {...state, manage: {...state.manage, toggleMenu: action.payload}};
        // Login
        case "EMAIL":
            return {...state, login: {...state.login, email: action.payload}};
        case "PASSWORD":
            return {...state, login: {...state.login, password: action.payload}};
        case "LOGIN_LOADING":
            return {...state, login: {...state.login, loading: action.payload}};
        case "ERRORS":
            return {...state, login: {...state.login, errors: action.payload}};
        case "PASS_RESET_DIALOG":
            return {...state, login: {...state.login, pass_reset_dialog: action.payload}};
        case "PRD_TEXTFIELD":
            return {...state, login: {...state.login, prd_textfield: action.payload}};
        // Signup
        case "USERNAME":
            return {...state, signup: {...state.signup, username: action.payload}};
        case "SIGNUP_EMAIL":
            return {...state, signup: {...state.signup, email: action.payload}};
        case "SIGNUP_PASSWORD":
            return {...state, signup: {...state.signup, password: action.payload}};
        case "CONFIRM_PASSWORD":
            return {...state, signup: {...state.signup, confirmPassword: action.payload}};
        case "SIGNUP_ERRORS":
            return {...state, signup: {...state.signup, errors: action.payload}};
        case "LOADING":
            return {...state, signup: {...state.signup, loading: action.payload}};
        // Home
        case "RENDER":
            return {...state, home: {...state.home, render: action.payload}};
        case "PROFILE_PICTURE":
            return {...state, home: {...state.home, profilePicture: action.payload}};
        case "UI_LOADING":
            return {...state, home: {...state.home, uiLoading: action.payload}};
        case "IMAGE_LOADING":
            return {...state, home: {...state.home, imageLoading: action.payload}};
        // Account
        case "ACCOUNT_FIRST_NAME":
            return {...state, account: {...state.account, firstName: action.payload}};
        case "ACCOUNT_LAST_NAME":
            return {...state, account: {...state.account, lastName: action.payload}};
        case "ACCOUNT_EMAIL":
            return {...state, account: {...state.account, email: action.payload}};
        case "ACCOUNT_PHONE_NUMBER":
            return {...state, account: {...state.account, phoneNumber: action.payload}};
        case "ACCOUNT_USERNAME":
            return {...state, account: {...state.account, username: action.payload}};
        case "ACCOUNT_COUNTRY":
            return {...state, account: {...state.account, country: action.payload}};
        case "ACCOUNT_PROFILE_PICTURE":
            return {...state, account: {...state.account, profilePicture: action.payload}};
        case "BUTTON_LOADING":
            return {...state, account: {...state.account, buttonLoading: action.payload}};
        case "IMAGE_ERROR":
            return {...state, account: {...state.account, imageError: action.payload}};
        case "PROFILE_COMPLETED":
            return {...state, account: {...state.account, profileCompleted: action.payload}};
        // Default
        default:
            return state;
    }
};

/* Export a component to provide the context to its children. This is used in our _app.js file */

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        globalStateReducer,
        initialState
    );

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    );
};

/*
Default export is a hook that provides a simple API for updating the global state.
This also allows us to keep all of this state logic in this one file
*/

const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalStateContext);

    const setArticle = (action) => {
        switch (action.type) {
            case "categories":
                return dispatch({type: "CATEGORIES", payload: action.payload});
            case "active_category":
                return dispatch({type: "ACTIVE_CATEGORY", payload: action.payload});
            case "non_auth_articles":
                return dispatch({type: "NON_AUTH_ARTICLES", payload: action.payload});
            case "current_article":
                return dispatch({type: "CURRENT_ARTICLE", payload: action.payload});
            case "auth_articles":
                return dispatch({type: "AUTH_ARTICLES", payload: action.payload});
            case "auth_articles_current":
                return dispatch({type: "AUTH_ARTICLES_CURRENT", payload: action.payload});
            case "edit_article":
                return dispatch({type: "EDIT_ARTICLE", payload: action.payload});
            case "delete_article":
                return dispatch({type: "DELETE_ARTICLE", payload: action.payload});
            default:
                return "Some mismatch is getting over - Article!";
        }
    }

    const setModal = (action) => {
        switch (action.type) {
            case "modal_is_open":
                return dispatch({type: "MODAL_IS_OPEN", payload: action.payload});
            case "modal_content":
                return dispatch({type: "MODAL_CONTENT", payload: action.payload});
            default:
                return "Some mismatch is getting over - Article!";
        }
    }

    const setManage = (action) => {
        switch (action.type) {
            case "is_authenticated":
                return dispatch({type: "IS_AUTHENTICATED", payload: action.payload});
            case "toggle_menu":
                return dispatch({type: "TOGGLE_MENU", payload: action.payload});
            default:
                return "Some mismatch is getting over - Manage!";
        }
    }

    const setLogin = (action) => {
        switch (action.type) {
            case "email":
                return dispatch({type: "EMAIL", payload: action.payload});
            case "password":
                return dispatch({type: "PASSWORD", payload: action.payload});
            case "login_loading":
                return dispatch({type: "LOGIN_LOADING", payload: action.payload});
            case "errors":
                return dispatch({type: "ERRORS", payload: action.payload});
            case "pass_reset_dialog":
                return dispatch({type: "PASS_RESET_DIALOG", payload: action.payload});
            case "prd_textfield":
                return dispatch({type: "PRD_TEXTFIELD", payload: action.payload});
            default:
                return "Some mismatch is getting over - LogIn!";
        }
    };

    const setSignup = (action) => {
        switch (action.type) {
            case "firstName":
                return dispatch({type: "FIRST_NAME", payload: action.payload});
            case "lastName":
                return dispatch({type: "LAST_NAME", payload: action.payload});
            case "phoneNumber":
                return dispatch({type: "PHONE_NUMBER", payload: action.payload});
            case "country":
                return dispatch({type: "COUNTRY", payload: action.payload});
            case "username":
                return dispatch({type: "USERNAME", payload: action.payload});
            case "email":
                return dispatch({type: "SIGNUP_EMAIL", payload: action.payload});
            case "password":
                return dispatch({type: "SIGNUP_PASSWORD", payload: action.payload});
            case "confirmPassword":
                return dispatch({type: "CONFIRM_PASSWORD", payload: action.payload});
            case "errors":
                return dispatch({type: "SIGNUP_ERRORS", payload: action.payload});
            case "loading":
                return dispatch({type: "LOADING", payload: action.payload});
            default:
                return "Some mismatch is getting over - SignUp!";
        }
    };

    const setHome = (action) => {
        switch (action.type) {
            case "render":
                return dispatch({type: "RENDER", payload: action.payload});
            case "profilePicture":
                return dispatch({type: "PROFILE_PICTURE", payload: action.payload});
            case "uiLoading":
                return dispatch({type: "UI_LOADING", payload: action.payload});
            case "imageLoading":
                return dispatch({type: "IMAGE_LOADING", payload: action.payload});
            default:
                return "Some mismatch is getting over - Home!";
        }
    };

    const setAccount = (action) => {
        switch (action.type) {
            case "firstName":
                return dispatch({type: "ACCOUNT_FIRST_NAME", payload: action.payload});
            case "lastName":
                return dispatch({type: "ACCOUNT_LAST_NAME", payload: action.payload});
            case "email":
                return dispatch({type: "ACCOUNT_EMAIL", payload: action.payload});
            case "phoneNumber":
                return dispatch({type: "ACCOUNT_PHONE_NUMBER", payload: action.payload});
            case "username":
                return dispatch({type: "ACCOUNT_USERNAME", payload: action.payload});
            case "country":
                return dispatch({type: "ACCOUNT_COUNTRY", payload: action.payload});
            case "profilePicture":
                return dispatch({type: "ACCOUNT_PROFILE_PICTURE", payload: action.payload});
            case "buttonLoading":
                return dispatch({type: "BUTTON_LOADING", payload: action.payload});
            case "imageError":
                return dispatch({type: "IMAGE_ERROR", payload: action.payload});
            case "profileCompleted":
                return dispatch({type: "PROFILE_COMPLETED", payload: action.payload});
            default:
                return "Some mismatch is getting over - Account!";
        }
    };

    return {
        setArticle,
        setModal,
        setManage,
        setLogin,
        setSignup,
        setHome,
        setAccount,
        s: {...state}
    };
};

export default useGlobalState;
