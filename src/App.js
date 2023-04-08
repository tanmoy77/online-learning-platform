import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPrivateRoute from './components/privateRoutes/AdminPrivateRoute';
import PrivateRoute from './components/privateRoutes/PrivateRoute';
import AdminPublicRoute from './components/publicRoutes/AdminPublicRoute';
import PublicRoute from './components/publicRoutes/PublicRoute';
import useCheckAuth from './hooks/useCheckAuth';
import AdminAddAssignment from './pages/admin/AdminAddAssignment';
import AdminAddQuiz from './pages/admin/AdminAddQuiz';
import AdminAddVideo from './pages/admin/AdminAddVideo';
import AdminAssignment from './pages/admin/AdminAssignment';
import AdminAssignmentMark from './pages/admin/AdminAssignmentMark';
import AdminDashBoard from './pages/admin/AdminDashBoard';
import AdminEditAssignment from './pages/admin/AdminEditAssignment';
import AdminEditQuiz from './pages/admin/AdminEditQuiz';
import AdminEditVideo from './pages/admin/AdminEditVideo';
import AdminLogin from './pages/admin/AdminLogin';
import AdminQuizes from './pages/admin/AdminQuizes';
import AdminVideos from './pages/admin/AdminVideos';
import Login from './pages/student//Login';
import CoursePlayer from './pages/student/CoursePlayer';
import Leaderboard from './pages/student/Leaderboard';
import Quiz from './pages/student/Quiz';
import Registration from './pages/student/Registration';

function App() {
  const checkAuth = useCheckAuth();
  return !checkAuth ? <></> :(
    <Router>
      <Routes>
        {/* Student Routes Start */}
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Registration /></PublicRoute>} />
        <Route path="/course" element={<PrivateRoute><CoursePlayer /></PrivateRoute>} />
        <Route path="/course/:id" element={<PrivateRoute><CoursePlayer /></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
        <Route path="/quiz/:videoId" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        {/* Student Routes End */}

        {/* Admin Routes Start */}
        <Route path="/admin" element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
        <Route path="/admin/dashboard" element={<AdminPrivateRoute><AdminDashBoard /></AdminPrivateRoute>} />
        <Route path="/admin/assignment" element={<AdminPrivateRoute><AdminAssignment /></AdminPrivateRoute>} />
        <Route path="/admin/assignment/add" element={<AdminPrivateRoute><AdminAddAssignment /></AdminPrivateRoute>} />
        <Route path="/admin/assignment/edit/:assignmentId" element={<AdminPrivateRoute><AdminEditAssignment /></AdminPrivateRoute>} />
        <Route path="/admin/assignment-mark" element={<AdminPrivateRoute><AdminAssignmentMark /></AdminPrivateRoute>} />
        <Route path="/admin/quizzes" element={<AdminPrivateRoute><AdminQuizes /></AdminPrivateRoute>} />
        <Route path="/admin/quizzes/add" element={<AdminPrivateRoute><AdminAddQuiz /></AdminPrivateRoute>} />
        <Route path="/admin/quizzes/edit/:quizId" element={<AdminPrivateRoute><AdminEditQuiz /></AdminPrivateRoute>} />
        <Route path="/admin/videos" element={<AdminPrivateRoute><AdminVideos /></AdminPrivateRoute>} />
        <Route path="/admin/videos/add" element={<AdminPrivateRoute><AdminAddVideo /></AdminPrivateRoute>} />
        <Route path="/admin/videos/edit/:videoId" element={<AdminPrivateRoute><AdminEditVideo /></AdminPrivateRoute>} />
        {/* Admin Routes End */}
      </Routes>
    </Router>
  );
}

export default App;
