class AddCategoryIdToPost < ActiveRecord::Migration[4.2]
  def change
    remove_column :posts, :category
    add_reference :posts, :category, index: true, foreign_key: true
  end
end
