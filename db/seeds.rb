user = User.create!(user_id:  "kensei416",
        email: "kensei416@gmail.com",
        password:              "foobar",
        password_confirmation: "foobar")

user.categories.create!(title: 'Inbox', user_id: user.id, fixed: true)

10.times do
  task = Faker::GameOfThrones.city
  user.categories.create!(title: task, user_id: user.id)
end

10.times do 
  category = user.categories.first
  category.tasks.create!(title: Faker::DragonBall.character)
end