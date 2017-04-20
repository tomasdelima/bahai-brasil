class Post < ActiveRecord::Base
  belongs_to :author, class_name: "User"
  belongs_to :created_by, class_name: "User"
  has_many :paragraphs, dependent: :destroy
  accepts_nested_attributes_for :paragraphs

  validates :title, :status, :author, :category, :created_by, presence: true

  scope :published, -> { where(status: :published) }
  scope :pending, -> { where(status: :pending) }

  STATUSES = ['pending', 'published']
end
