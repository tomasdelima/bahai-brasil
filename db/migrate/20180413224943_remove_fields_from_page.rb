class RemoveFieldsFromPage < ActiveRecord::Migration[5.1]
  def change
    remove_columns :pages, :appears_on_menu, :menu_has_transition
  end
end
