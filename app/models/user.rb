class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable # :confirmable, :lockable, :timeoutable and :omniauthable

  has_many :created_posts, class_name: "Post", foreign_key: "created_by_id"
  has_many :authored_posts, class_name: "Post", foreign_key: "author_id"
end
