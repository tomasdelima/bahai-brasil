class Device < ActiveRecord::Base
  validates :token, uniqueness: true, presence: true
end
