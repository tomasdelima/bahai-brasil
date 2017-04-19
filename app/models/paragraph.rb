class Paragraph < ActiveRecord::Base
  after_save :touch_post
  belongs_to :post

  STYLES = [:left, :center, :right, :quote, :indent1, :indent2, :indent3, :indent4]

  def touch_post
    post.touch
  end
end
