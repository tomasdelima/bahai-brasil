class Paragraph < ActiveRecord::Base
  belongs_to :post

  STYLES = [:left, :center, :right, :quote, :indent1, :indent2, :indent3, :indent4]
end
