json.set! :user do
  json.extract! @user, :id, :email, :created_at, :updated_at, :password_digest
end
