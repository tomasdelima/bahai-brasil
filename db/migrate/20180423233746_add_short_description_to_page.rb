class AddShortDescriptionToPage < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :short_description, :text
  end
end
