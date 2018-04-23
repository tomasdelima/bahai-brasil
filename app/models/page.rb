class Page < ApplicationRecord
  has_paper_trail

  has_many :sub_pages, class_name: "Page", foreign_key: "parent_page_id"
  belongs_to :parent_page, class_name: "Page"
end
