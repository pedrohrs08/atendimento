require 'bundler/setup'
require 'active_job'
require 'sneakers'

Sneakers.configure({
	:heartbeat => 2,
                    :amqp => 'amqp://test:test@52.36.70.190:5672',
                    :vhost => 'requests',
                    :exchange => 'requests',
                    :exchange_type => :fanout,
                    :durable => :true
         })
Sneakers.logger.level = Logger::INFO # the default DEBUG is too noisy

class ReceiveRequestJob < ActiveJob::Base
  queue_as :requests

  def perform()
    p "recebi gente"
  end
end

ReceiveRequestJob.perform_later()