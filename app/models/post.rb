class Post < ActiveRecord::Base
  belongs_to :category
  has_many :paragraphs, dependent: :destroy
  accepts_nested_attributes_for :paragraphs

  validates :title, :status, :category, presence: true

  scope :published, -> { where(status: :published) }
  scope :pending, -> { where(status: :pending) }

  STATUSES = ['pending', 'published']
end
