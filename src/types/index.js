// @flow

// TODO: Refinement type for URLs
export type Url = String;

export type Owner = {
  login: String,
  url: Url, 
};

export type Language = {
  name: String,
  color: String,
};

export type Repo = {
  name: String,
  url: Url, 
  owner: Owner,
  primaryLanguage: Language,
  languages: {
    nodes: Array<Language>,
  },
  pushedAt: Date,
};

export type Repos = Array<Repo>;
