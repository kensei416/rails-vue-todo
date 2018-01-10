class User < ApplicationRecord
  attr_accessor :remember_token
  has_many :categories, dependent: :destroy
  has_many :tasks, through: :categories
  before_save { email.downcase! }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 }, format:     { with: VALID_EMAIL_REGEX }, uniqueness: true
  VALID_USER_ID_REGEX = /\A[a-z0-9]+\Z/
  validates :user_id, presence: true, length: { maximum: 14 } , format: { with: VALID_USER_ID_REGEX }, uniqueness: true
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }
 
  def prepare_save
    self.email = email.downcase
    self.user_id = user_id.downcase
  end

  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def User.new_token
    SecureRandom.urlsafe_base64
  end

  def categories
    Category.where("user_id = ?", id)
  end

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  def feed
  end
end
