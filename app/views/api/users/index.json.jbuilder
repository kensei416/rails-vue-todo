json.set! :users do
  json.array! @users do |user|
    json.extract! user, :id, :email, :created_at, :updated_at, :password_digest
  end
end
