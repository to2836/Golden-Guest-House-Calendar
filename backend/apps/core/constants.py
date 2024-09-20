class AgentConstant:
    AGODA = 'AGODA'
    EXPEDIA = 'EXPEDIA'
    TRIP_DOT_COM = 'TRIP_DOT_COM'
    AIRBNB = 'AIRBNB'
    GOLDEN_GUEST_HOUSE = 'GOLDEN_GUEST_HOUSE'
    
    TYPE = (
        (AGODA, 'Agoda'),
        (EXPEDIA, 'Expedia'),
        (TRIP_DOT_COM, 'Trip.com'),
        (AIRBNB, 'Airbnb'),
        (GOLDEN_GUEST_HOUSE, 'Golden Guest House')
    )

class BookingStatusConstant:
    RESERVED = 'RESERVED'
    CANCEL = 'CANCEL'
    NOSHOW = 'NOSHOW'

    TYPE = (
        (RESERVED, '예약'),
        (CANCEL, '취소'),
        (NOSHOW, '노쇼')
    )

class RoomNameConstant:
    NAGASAKI = 'NAGASAKI'
    FUKUOKA = 'FUKUOKA'
    KUMAMOTO = 'KUMAMOTO'
    OOITA = 'OOITA'
    KAGOSHIMA = 'KAGOSHIMA'
    MIYAZAKI = 'MIYAZAKI'
    SEOUL = 'SEOUL'

    TYPE = (
        (NAGASAKI, '長崎'),
        (FUKUOKA, '福岡'),
        (KUMAMOTO, '熊本'),
        (OOITA, '大分'),
        (KAGOSHIMA, '鹿児島'),
        (MIYAZAKI, '宮崎'),
        (SEOUL, 'ソウル'),
    )

class GenderConstant:
    MAN = 'MAN'
    WOMAN = 'WOMAN'

    TYPE = (
        (MAN, '남'),
        (WOMAN, '여')
    )