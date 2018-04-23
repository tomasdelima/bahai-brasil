class HomePage < ApplicationRecord
  validate :validate_oneness

  def validate_oneness
    errors.add(:id, :defying_oneness, message: "cannot save more than one Home Page") if HomePage.all.count > 0
  end
end
