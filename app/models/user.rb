class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable # :confirmable, :lockable, :timeoutable and :omniauthable

  validates :name, :email, presence: true
end
