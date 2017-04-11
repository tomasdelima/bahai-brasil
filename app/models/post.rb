class Post < ActiveRecord::Base
  belongs_to :author, class_name: "User"
  belongs_to :created_by, class_name: "User"
end
