json.set! :users do
  json.array! @users do |user|
    json.extract! user, :id, :email, :user_id, :created_at, :updated_at, :password_digest
  end
end
