class AddSubMenuToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :sub_menu?, :boolean
  end
end
