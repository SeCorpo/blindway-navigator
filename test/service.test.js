
const axios = require('axios');
const service = require('../frontend/planner-page/js/service');

// Mock sessionStorage
global.sessionStorage = {
    setItem: jest.fn(),
};

jest.mock('axios');

describe('service function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should store routeFound in sessionStorage if routeFound is truthy', async () => {
        const mockRouteFound = [{/* route data */}];

        // Mock the axios.get method
        jest.spyOn(axios, 'get').mockResolvedValue({ data: { routeFound: mockRouteFound } });

        await service('Haarlem', 'Den Bosch', '12:00:00', 0);

        // Check if routeFound was stored in sessionStorage
        expect(sessionStorage.setItem).toHaveBeenCalledWith('routeFoundData', JSON.stringify(mockRouteFound));
    });

    it('should handle API request error', async () => {
        axios.get.mockRejectedValue(new Error('API Request Error'));

        const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        await service('fromLocation', 'toLocation', '12:00:00', 0);

        // Check if it logged an error
        expect(spyConsoleError).toHaveBeenCalledWith('API Request Error:', expect.any(Error));

        // Check if it triggered an alert
        expect(spyAlert).toHaveBeenCalledWith("API Request Error: API Request Error");

        // Restore spies
        spyConsoleError.mockRestore();
        spyAlert.mockRestore();
    });
});
