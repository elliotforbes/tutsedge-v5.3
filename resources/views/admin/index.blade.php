<!DOCTYPE html>
<html ng-app="root" ng-strict-di lang="en">
<head>
  <meta charset="UTF-8">
  <title>AngularJS Admin Panel</title>

  <link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="{{ asset('/css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ asset('/css/admin-bundle.css') }}">

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-route.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.min.js"></script>
  <script src="{{ asset('/js/angular-charts.js') }}"></script>

</head>
<body>
  
  <top-nav></top-nav>

  <div class="root wrapper">
    <ng-view></ng-view>
  </div>

  <script src="{{ asset('/js/admin-bundle.js') }}?v=242"></script>
  <!-- TODO: Remove this sorta hacky way of getting csrf token -->
  <script>
    angular.module("root").constant("CSRF_TOKEN", '{{ csrf_token() }}');
  </script>
</body>
</html>