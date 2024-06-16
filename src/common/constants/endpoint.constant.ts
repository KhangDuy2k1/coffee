export enum Endpoint { 
    //user/{...}
    REGISTER = "register",
    LOGIN = "login",
    UPDATE_USER = "update-user/:id",
    DELETE_USER = "delete-user/:id",
    FIND_USER_BY_ID= ":id",
    FIND_USER_LOGIN = "user-login",
    ALL_USER = "all-users",
    GET_USER_PAGE = "all-users-page",
    BLOCK = "block/:id_user",
    UN_BLOCK = "un-block/:id_user",

    ADD_CATEGORY = "add-category",
    GET_ALL_CATEGORY = "all-categories",
    DELETE_CATEGORY = "delete-category/:id",
    UPDATE_CATEGORY = "update-category/:id",

    ADD_COFFEE = "add-coffee",
    DELETE_COFFEE = "delete-coffee/:id",
    GET_ALL_COFFEE = "all-coffees",
    UPDATE_COFFEE = "update-coffee/:id",
    GET_COFFEE_BY_ID = "get-coffee-id/:id",
    LIKE_COFFEE = "like-coffee/:id",
    UNLIKE_COFFEE = "unlike-coffee/:id",
    GET_COFFEE_LIKED = "get-coffee-liked",

    ORDER_COFFEE = "order-coffee/:method",
    GET_ALL_ORDER = "all-orders",
    GET_ORDER_BY_ID = "get-order-id/:id",
    RECEIVED_ORDER = "received/:id",
    DELETE_ORDER = "delete-order/:id",
    GET_ALL_ORDER_USER_LOGIN = "all-orders-user",
    CANCLE_ORDER = "cancle-order/:id",
    CANCLE_ORDER_DIRECT = "cancle-order-direct/:id",

    REVIEW_COFFEE = "review-coffee/:id",

    CREATE_WALLET = "create-wallet",
    TOP_UP_TO_WALLET = "top-up",
    GET_WALLET_USER_LOGIN = "get-wallet",

    GET_ALL_ADDRESS_ORDER = "all-address",
    ADD_ADDRESS_ORDER = "add-address"
}