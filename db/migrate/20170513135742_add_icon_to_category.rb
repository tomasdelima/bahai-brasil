class AddIconToCategory < ActiveRecord::Migration[4.2]
  def change
    add_column :categories, :icon_name, :string
    add_column :categories, :icon_library, :string
  end
end
