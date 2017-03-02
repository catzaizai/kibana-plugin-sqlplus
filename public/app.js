import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

uiRoutes.enable();
uiRoutes
.when('/', {
  template,
  resolve: {
    currentTime($http) {
      return $http.get('../api/sqlplus/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
});

uiModules
.get('app/sqlplus', [])
.controller('sqlplusHelloWorld', function ($scope, $route, $interval) {
  $scope.title = 'Sqlplus';
  $scope.description = 'kibana plugin sql plus';

  const currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  const unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});
