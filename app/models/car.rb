class Car < ApplicationRecord
	validates :year   , presence: true
	validates :make   , presence: true
	validates :model  , presence: true
	validates :engine , presence: true
end




