class hardwareSet:
    # Constructors
    def __init__(self):
        self.capacity = 0
        self.availability = 0
        return

    def initialize_capacity(self,qty):
        self.capacity = qty
        self.availability = qty
        return

    # Getters
    def get_availability(self):
        return self.availability

    def get_capacity(self):
        return self.capacity

    # Check in/out
    def check_out(self, qty):
        # If trying to check out more than available, check out the rest and return -1
        if qty > self.availability:
            self.availability = 0
            return -1
        # No issues
        else:
            self.availability -= qty
        return

    def check_in(self, qty):
        self.availability += qty
        return