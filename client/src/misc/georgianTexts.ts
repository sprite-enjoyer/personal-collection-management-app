import { StaticTextObject } from "./englishTexts";

const georgianTexts: StaticTextObject = {
  MainPage: {
    header1: "შეაგროვე და ნახე",
    header2: "დიდი კოლექციები:",
    header3: "ახლახანს დამატებული ნივთები:",
  },
  AdminPage: {
    tableButton: "ვიზიტი",
    button1: "დაბლოკვა",
    button2: "განბლოკვა",
    button3: "წაშლა",
    button4: "ადმინის უფლებების მიცემა",
    button5: "ადმინის უფლებების წართმევა",
  },
  ProfilePage: {
    header: "-ის კოლექციები",
    button: "კოლექციის შექმნა",
  },
  CollectionPage: {
    noItemsHeader: "ამ კოლექციაში ჯერ არ არის ნივთები!",
    button1: "კოლექციის მოდიფიკაცია",
    button2: "ნივთის დამატება",
    exportText: "CSV-ს გადმოტვირთვა",
  },
  ItemPage: {
    owner: "მფლობელი: ",
    fromCollection: "კოლექციიდან: ",
    tags: "იარლიყები: ",
    additionalFields: "დამატებითი ველები: ",
    none: "არ აქვს",
    likes: "მოწონებები: ",
    likeButton: "მოწონება",
    comments: "კომენტარები: ",
  },
  LoginPage: {
    inputLabel1: "სახელი",
    inputLabel2: "პაროლი",
    button: "შესვლა",
  },
  RegisterPage: {
    inputLabel1: "სახელი",
    inputLabel2: "ელ-ფოსტა",
    inputLabel3: "პაროლი",
    inputLabel4: "გაიმეორეთ პაროლი",
    button: "რეგისტრაცია",
  },
  CollectionConfigModal: {
    inputLabel1: "სახელი",
    inputLabel2: "აღწერა",
    inputLabel3: "თემა",
    inputLabel4: "სახელი",
    inputLabel5: "ტიპი",
    button1: "ველის დამატება",
    button2Create: "კოლექციის შექმნა",
    button2Edit: "კოლექციის შეცვლა",
    deleteDialog: "მართლა გსურთ კოლექციის წაშლა?",
    uploadImage: "ატვირთე სურათი",
    uploadImageSubmit: "ატვირთვა",
  },
  ItemConfigModal: {
    inputLabel1: "სახელი",
    inputLabel2: "იარლიყები",
    button1Create: "ნივთის დამატება",
    button1Edit: "ნივთის შეცვლა",
  },
  Header: {
    login: "შესვლა",
    register: "რეგისტრაცია",
  },
  SearchModal: {
    results: "ძიების შედეგი: ",
  },
  ErrorComponent: {
    header1: "შეიქმნა პატარა ხარვეზი... 😳",
    header2: "შეგიძლია გადახვიდე ",
    header3: "თუ ახალი ხარ, სცადე ",
    link1text: "მთავარ გვერდზე",
    link2text: "რეგისტრაციის გვერდი",
  },
  Custom404: {
    header1: "ეს გვერდი არ არსებობს!",
  },
  Blocked: {
    header1: "შენ ხარ დაბლოკილი!",
    header3: "შეგიძლია შექმნა ახალი პროფილი: ",
  },
};

export default georgianTexts;
