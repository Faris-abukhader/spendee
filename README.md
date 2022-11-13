<p align="center">
<img src="https://user-images.githubusercontent.com/70070951/201531385-e00d7c48-d4b4-47dd-8a11-afdbcac80ccd.png" width="400" height="200">
</p>


## 🚩 Table of Contents

- [Introduction](#--introduction)
- [Installation](#--installation)
- [Development setup](#--development-setup)
- [Project structure](#--project-structure)
- [Features](#--features)
- [Packages](#-packages)
- [License](#-license)




## <img src="https://cdn-icons-png.flaticon.com/512/1436/1436664.png" width="25" height="25" style="padding-right:15px">  Introduction 

<p>

Manage all your money with ease from one place with Ewallet. Track your income and expenses, analyze your financial habits and stick to your budgets.

In this app user need to register account first .

In the dashboard user can have one wallet , and he can add his transations whether it's income or expenses.

User also can create budget for fixed time , so he can track his income and expenses in one specific period .

Also user can check his total transations in very cool chart .
</br>

</p>


## <img src="https://cdn-icons-png.flaticon.com/512/814/814848.png" width="25" height="25" style="padding-right:15px">  Installation 


### 🔘 Cloning repository
1. On GitHub.com, navigate to the main page of the repository.
2. Above the list of files, click  Code.
3. Copy the URL for the repository.
4. Open Terminal.
5. Change the current working directory to the location where you want the cloned directory.
6. Type git clone, and then paste the URL you copied earlier.
```
git clone github.com/Faris-abukhader/spendee
```
Press Enter to create your local clone
```
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Cloning into `spendee`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```
<br/>


## <img src="https://cdn-icons-png.flaticon.com/512/814/814848.png" width="25" height="25" style="padding-right:15px">  Development setup

To set up this project you need to download NodeJs in your machine or if you have it make sure you have the latest version of it.

### 🔘 Checking up Node version
```
node -v
```

### 🔘 Downloading Node

> for Windows  


Download the windows installer from [NodeJs offical website](https://nodejs.org/en/download/) make sure you have download the latest version of NodeJs.
<br/>


> for Mac
- You can download NodeJs using brew CLI
```
brew install node
```
- You can download NodeJs mac version through [the offical website](https://nodejs.org/en/download/)
<br/>
<hr/>


### 🔘 Downloading the packages

Go to project direct where  <package.json> is exist and type in terminal :
```
npm install 
```

To run the project just type down in terminal :
```
npm run dev
```

<br/>
<hr/>


## <img src="https://cdn-icons-png.flaticon.com/512/535/535471.png" width="25" height="25" style="padding-right:15px">  Project structure  

```
📦spendee
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜...
 ┃ ┣ 📂budget
 ┃ ┃ ┗ 📜...
 ┃ ┣ 📂charts
 ┃ ┃ ┗ 📜...
 ┃ ┣ 📂customModals
 ┃ ┃ ┗ 📜...
 ┃ ┣ 📂home
 ┃ ┃ ┗ 📜...
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📜...
 ┃ ┃ ┗ 📜Client.js
 ┃ ┣ 📂reviewBudget
 ┃ ┃ ┗ 📜...
 ┃ ┣ 📂settings
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📜…
 ┃ ┃ ┗ 📜…
 ┃ ┣ 📂transaction
 ┃ ┃ ┗ 📜…
 ┃ ┗ 📜.DS_Store
 ┣ 📂pages
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📜[...nextauth].js
 ┃ ┃ ┗ 📜hello.js
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜resetPassword.js
 ┃ ┃ ┣ 📜signIn.js
 ┃ ┃ ┣ 📜signUp.js
 ┃ ┃ ┗ 📜twoStep.js
 ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂budget
 ┃ ┃ ┃ ┣ 📂review
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂settings
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📂transaction
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📜_app.js
 ┃ ┗ 📜index.js
 ┣ 📂public
 ┣ 📂store
 ┃ ┣ 📂slices
 ┃ ┃ ┣ 📜budgetSlice.js
 ┃ ┃ ┣ 📜transactionCategorySlice.js
 ┃ ┃ ┣ 📜transactionSlice.js
 ┃ ┃ ┗ 📜userSlice.js
 ┃ ┗ 📜store.js
 ┣ 📂styles
 ┃ ┣ 📜Home.module.css
 ┣ 📂validation
 ┃ ┣ 📜email.js
 ┃ ┗ 📜password.js
 ┣ 📜.gitignore
 ┣ 📜next.config.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
 ```


## <img src="https://cdn-icons-png.flaticon.com/512/535/535471.png" width="25" height="25" style="padding-right:15px">  Features  

- Authentications , authorizations are all implemented with differents layers.
- Full state management implementation using redux toolkit.
- Whole project pages is full responsive.



## 📦 Packages

| Name | Description |
| --- | --- |
| [`@reduxjs/toolkit`](https://www.npmjs.com/package/@reduxjs/toolkit) | Simple. Includes utilities to simplify common use cases like store setup, creating reducers, immutable update logic, and more |
| [`bootstrap`](https://www.npmjs.com/package/bootstrap) | Sleek, intuitive, and powerful front-end framework for faster and easier web development. |
| [`axios`](https://www.npmjs.com/package/axios) | Promise based HTTP client for the browser and node.js |
| [`chart.js`](https://www.npmjs.com/package/chart.js) | Simple yet flexible JavaScript charting for designers & developers. |
| [`next-redux-wrapper`](https://www.npmjs.com/package/next-redux-wrapper) | A HOC that brings Next.js and Redux together |
| [`sweetalert2`](https://www.npmjs.com/package/sweetalert2) | A beautiful, responsive, customizable, accessible for JavaScript's popup boxes. |
| [`next-auth`](https://github.com/nextauthjs/next-auth) | is a complete open source authentication solution for Next.js applications. |


## 📜 License

This software is licensed under the [MIT](https://github.com/Faris-abukhader/we-work-backend/blob/master/LICENSE) © [FaRiS](https://github.com/Faris-abukhader).
