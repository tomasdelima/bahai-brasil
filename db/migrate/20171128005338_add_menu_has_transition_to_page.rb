class AddMenuHasTransitionToPage < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :menu_has_transition, :boolean
  end
end
