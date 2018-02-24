class AddCategoryToPost < ActiveRecord::Migration[4.2]
  def change
    add_column :posts, :category, :string
  end
end
