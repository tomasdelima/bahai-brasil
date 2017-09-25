class AddAppearsOnMenuToPage < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :appears_on_menu, :boolean, default: true
  end
end
