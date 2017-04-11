class PostsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Post.published.to_json(include: [:author, :paragraphs]) }
    end
  end
end
