var viewModel

        $(document).ready(function () {
			viewModel = dataBind()
			$('#btnGo').on('click', function() {
				getCommits()
				getOpenIssues()
				getClosedIssues()
			})
        })

        function formatDates(classId) {
            moment.locale('en')
            $(classId).each(function (index, dateElem) {
                var formatted = moment(dateElem.textContent).format('lll')
                dateElem.textContent = formatted;
            })
        }
		
		function dataBind() {
			var vm = new function() {		
				this.gitRepoUrl = ko.observable("joyent/node")
				this.commits = ko.observable([])
				this.openIssues = ko.observable([])
				this.closedIssues = ko.observable([])
			}
			ko.applyBindings(vm);
			return vm
		}

		function getCommits() {
			$.ajax({
				dataType: 'json',
				url: 'https://api.github.com/repos/' + viewModel.gitRepoUrl() + '/commits',
				success: showCommits,
				error: function() {
				    viewModel.commits([])
				    viewModel.openIssues([])
                    viewModel.closedIssues([])
					alert("Unable to connect to repo '" + viewModel.gitRepoUrl() +"'")
					}
			})
		}

		// An error will be indicated when attempting to get the commits.
		
		function getOpenIssues() {
			$.ajax({
				dataType: 'json',
				url: 'https://api.github.com/repos/'  + viewModel.gitRepoUrl() + '/issues?state=open',
				success: showOpenIssues
			})
		}
		
		function getClosedIssues() {
			$.ajax({
				dataType: 'json',
				url: 'https://api.github.com/repos/'  + viewModel.gitRepoUrl() + '/issues?state=closed',
				success: showClosedIssues
			})
		}

		function showCommits(data) {
			viewModel.commits(data)
			formatDates('.commit-datefield')
        }

		function showOpenIssues(data) {
			viewModel.openIssues(data)
			formatDates('.open-issues-datefield')
        }

		function showClosedIssues(data) {
			viewModel.closedIssues(data)
			formatDates('.closed-issues-datefield')
        }
1q