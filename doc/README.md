# Tupper

## Intro

In the days we live in, people tend to have less and less time. Yet, there has been a big surge in interest towards cooking, food, and well-being. I believe there's a significant portion of the population that has a lot of time and exceptional cooking skills, while another significant portion lacks time due to the fast-paced nature of the present. It is crucial to connect those with few time to those who have plenty of time and an enthusiastic love for cooking.

![](https://media.giphy.com/media/wry7vkOOmDTMs/giphy.gif)

## Functional description

### Use cases

 - Create a new meal
 - See meal detail
 - See meals of other users
 - Add meals to my cart
 - Pay meals
 - See ordered meals to me in my profile
 - Mark a meal as prepared as a Chef
 - Mark an order as done as a client
 - Search for a meal

 ### Coming soon
 - See Chef detail page
 - Set a Chef as favourite
 - See my favourites chefs
 - See reviews in Chef detail page
 - Add a review


## Technical description

### Data model

Users
- id (oid)
- name (string)
- username (string)
- email (string)
- password (string)
- description(string)
- avatar (string)
- tags(string array)
- availability(array of obj)
- location (string)
- likedChefs (oid array, refers to user id)
- reviews (array of obj)
- cart (array of items)
- order (array of order)
- selledMeals (array of chefOrder)

Meals
- id (string)
- author (oid, refers to User id)
- images (img/imgs)
- title (string)
- description (string)
- categories (array of strings)
- ingredients (array of strings)
- bestBefore (string)
- price (number)
- date(string)


### Test Coverage

![](https://res.cloudinary.com/dbn2zybcu/image/upload/v1693500988/Captura_de_pantalla_2023-08-31_a_las_18.56.16_bphc6t.png)

## Planning

For planning details, go check [Notion](https://lily-dentist-2a0.notion.site/ISDI-Final-project-9e8e2b7b2b034ac2923d8d9808f9d614?pvs=4)