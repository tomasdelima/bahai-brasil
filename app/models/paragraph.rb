class Paragraph < ActiveRecord::Base
  before_save :set_default_ordering
  after_save :touch_post, :delete_if_empty
  belongs_to :post
  default_scope { order "ordering" }

  STYLES = [:left, :center, :right, :quote, :indent1, :indent2, :indent3, :indent4]

  def set_default_ordering
    self.ordering ||= post.paragraphs.map(&:ordering).compact.max + 1
  end

  def touch_post
    post.touch
  end

  def delete_if_empty
    destroy if body.squish.empty?
  end
end
