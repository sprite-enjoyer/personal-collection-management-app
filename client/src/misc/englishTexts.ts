const englishTexts = {
  MainPage: {
    header1: "Collect and view",
    header2: "Here are some huge collections:",
    header3: "Recently added items:",
  },
  AdminPage: {
    tableButton: "Visit user",
    button1: "Block",
    button2: "Unblock",
    button3: "Delete",
    button4: "Give admin permissions",
    button5: "Remove admin permissions",
  },
  ProfilePage: {
    header: "'s collections",
    button: "Create collection",
  },
  CollectionPage: {
    noItemsHeader: "No items in this collection yet!",
    button1: "Edit collection",
    button2: "Add item",
    exportText: "Export to CSV",
  },
  ItemPage: {
    owner: "Owner: ",
    fromCollection: "From Collection: ",
    tags: "Tags: ",
    likes: "Likes: ",
    additionalFields: "Additional Fields: ",
    none: "none",
    likeButton: "Like",
    comments: "Comments: ",
  },
  LoginPage: {
    inputLabel1: "Username",
    inputLabel2: "Password",
    button: "login",
  },
  RegisterPage: {
    inputLabel1: "Username",
    inputLabel2: "Email",
    inputLabel3: "Password",
    inputLabel4: "Repeat password",
    button: "register",
  },
  CollectionConfigModal: {
    inputLabel1: "Name",
    inputLabel2: "Description",
    inputLabel3: "Topic",
    inputLabel4: "Name",
    inputLabel5: "Type",
    button1: "add custom field",
    button2Create: "add collection",
    button2Edit: "edit collection",
    deleteDialog: "Delete this collection?",
    uploadImage: "Choose image",
    uploadImageSubmit: "Submit",
  },
  ItemConfigModal: {
    inputLabel1: "Name",
    inputLabel2: "Item Tags",
    button1Create: "add item",
    button1Edit: "edit item",
  },
  Header: {
    login: "login",
    register: "register",
  },
  SearchModal: {
    results: "Results: ",
  },
  ErrorComponent: {
    header1: "What? An Oopsie happened... 😳",
    header2: "You can go to the ",
    header3: "If you're new, you're welcome to try ",
    link1text: "HomePage",
    link2text: "Register Page",
  },
  Custom404: {
    header1: "This link doesn't exist!",
  },
};

export type StaticTextObject = typeof englishTexts;

export default englishTexts;
