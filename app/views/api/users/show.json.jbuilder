json.set! :user do
  json.extract! @user, :id, :email, :user_id, :created_at, :updated_at, :password_digest
end
