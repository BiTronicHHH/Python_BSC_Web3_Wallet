export type MediaState = {
  loading: boolean;
  mediaUploaded: boolean;
  userInvited: boolean;
  MediaErrors: null;
  mediaList: Array<Media>;
};

export type Media = {
  _id: string;
  name: string;
  description: string;
  type: number;
  cid: string;
  price: number;
  copies_limit: number;
  owner: {
    id: string;
    display_name: string;
    avatar: string;
  }
};

export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  account_type: number;
  account_status: number;
};

export type UserState = {
  userAuthenticated: User | null;
  loading: boolean;
  isAuthenticated: boolean;
};


export type Business = {
  _id: string;
  display_name : string;
  avatar: string;
  bio: string;
  email: string;
  account_status: number;
  verified: boolean;
  visibility: 'premium' | 'basic';
  payment_method: 'paypal' | 'american-express' | 'master-card' | 'visa' | 'near' | 'bitcoin' | 'usdc'
}

export type BusinessState = {
  businessAuthenticated: Business | null;
  loading: boolean;
  isAuthenticated: boolean;
};

export type UpdateBusinessState = {
  business: Business | null;
  updateError: null | string;
  updateSuccess: boolean;
};

export type PopularBusinessState = {
  popluarBusinessList: Business[] | null;
  loading: boolean;
}

export type BusinessRegisterState = {
  loading: boolean;
  registerSuccess: boolean;
  registerErrors: null;
  business: Business | null;
};

export type BusinessLoginState = {
  loading: boolean;
  token: string | null;
  loginErrors: null | string;
  loginSuccess: boolean;
};

export type CreatedSurvey = {
  title: String;
  description: String;
  pages: SurveyPages;
  type: Number;
};

export type Elements = {
  type: string;
  name: string;
  title: string;
  points: number;
};

export type SurveyPage = {
  name: string;
  elements: Array<Elements>;
};

export type SurveyPages = {
  pages: Array<SurveyPage>;
};

export type SurveyState = {
  loading: boolean;
  surveySaved: boolean;
  surveysList: Array<Survey> | [];
  surveyToEdit: Array<Survey> | [];
  surveyPublished: boolean;
  surveyDeleted: boolean;
  surveyUpdated: boolean;
  invitationSuccess: boolean;
};

export type Survey = {
  _id: String;
  title: String;
  description: String;
  type: Number;
  pages: SurveyPages;
  white_list: Array<Object>;
  created_at: Date;
  status: number;
};

export type RegisterState = {
  loading: boolean;
  registerSuccess: boolean;
  registerErrors: null;
  user: User | null;
};

export type LoginState = {
  loading: boolean;
  token: string | null;
  loginErrors: null | string;
  loginSuccess: boolean;
};
