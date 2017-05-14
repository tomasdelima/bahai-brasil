class AddIconToCategory < ActiveRecord::Migration
  def change
    add_column :categories, :icon_name, :string
    add_column :categories, :icon_library, :string
  end
end
