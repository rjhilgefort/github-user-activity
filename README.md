# GitHub User Activity

Shows recent ativity of a user by login username.

## Environment Variables

Set the environment variables however you would like, but the easiest for development is to copy over the `.env.example` to `.env`. Env vars are prefixed in accordance with [`create-react-app`](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables). 

| Name | Default | Description |
| --- | --- | --- |
| REACT_APP_GH_AUTH | - | Authorization token for fetching from the GH API |


## Flow

This project uses Flow instead of  React PropTypes. I can see runtime typechecking being useful as well, but I value static type checking quite a lot. Flow was just a slight bit easier to get going because CRA already has support in their webpack config.

#### Adding An Implemented TypeDef



