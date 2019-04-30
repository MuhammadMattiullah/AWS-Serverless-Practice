import { DataSource } from 'data-access-object';

export const dataSource: DataSource = {
    config: {
        url: 'http://localhost:27017/lambda'
        // Url: 'mongodb://jugglingdb:jugglingdb1@ds239692.mlab.com:39692/jugglingdb'
    },
    name: 'mongodb'
};
export const etlsource: DataSource = {
    config: {
        url: 'http://35.159.19.24:38128/Mevris-IoT4992-ETL-20180531'
        // Url: 'mongodb://jugglingdb:jugglingdb1@ds239692.mlab.com:39692/jugglingdb'
    },
    name: 'mongodb'
};
