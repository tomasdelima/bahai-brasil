class CreateParagraphs < ActiveRecord::Migration
  def change
    create_table :paragraphs do |t|
      t.text :body
      t.string :style
      t.references :post, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
