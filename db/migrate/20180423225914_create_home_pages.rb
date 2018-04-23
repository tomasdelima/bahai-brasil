class CreateHomePages < ActiveRecord::Migration[5.1]
  def change
    create_table :home_pages do |t|
      t.string :video
      t.text :video_quote
      t.string :video_author
      t.text :body

      t.timestamps
    end
  end
end
