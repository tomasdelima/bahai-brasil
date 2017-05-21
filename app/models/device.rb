class Device < ActiveRecord::Base
  validates :token, uniqueness: true, presence: true
  scope :androids, -> { where os: 'android' }
end
