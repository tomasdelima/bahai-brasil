class Post < ActiveRecord::Base
  before_save :push_to_android_devices, if: :should_push
  belongs_to :category
  has_many :paragraphs, dependent: :destroy
  accepts_nested_attributes_for :paragraphs

  validates :title, :status, :category, presence: true

  scope :published, -> { where(status: :published) }
  scope :pending, -> { where(status: :pending) }

  STATUSES = ['pending', 'published']

  def push_to_android_devices
    Device.androids.each do |device|
      HTTParty.post('https://fcm.googleapis.com/fcm/send', body: data(device.token).to_json, headers: headers) if device.token
    end
  end

  def should_push
    status_was != 'published' && status == 'published'
  end

  def data (destination)
    {
      to: destination,
      notification: {
        title: "Novo artigo disponível",
        body: title,
        sound: "default",
        # icon: "ic_launcher",
        # color: "red",
      },
    }
  end

  def headers
    {
      'Content-Type' => "application/json",
      'Authorization' => "key=#{ENV["FCM_API_KEY"]}"
    }
  end

  def author
    # Method kept for compatibility. As soon there is no more app on 1.1, remove this method
    {name: ''}
  end
end
