<?php // Desktop main navigation with Tailwind dropdowns ?>
<nav class="hidden md:flex items-center gap-6">
  <a href="/newsite/index.php" class="hover:text-blue-200">Home</a>

  <div class="relative group">
    <button class="inline-flex items-center gap-1 hover:text-blue-200">About <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg></button>
    <div class="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow-lg rounded-md w-[20rem] p-2 z-50">
      <ul class="space-y-1">
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../profile.php">Profile</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../visionmission.php">Vision, Mission</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../foundersecretary.php">Founder Secretary</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../management.php">Management</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../principal.php">Principal</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../viceprincipal.php">Vice-Principal</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../governingbody.php">Governing Board</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Approval Letter
            <span class="text-xs text-gray-500">›</span>
          </div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-48 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../jntukapproval.php">JNTUK</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../aicteeoa.php">AICTE</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../highereducationapproval.php">Higher Education Permission</a>
          </div>
        </li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Status <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-48 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../autonomus_status.php">Autonomous</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../naac_status.php">NAAC</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../ugc2f_status.php">UGC 2F</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../ugc12b_status.php">UGC 12(B)</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../strategic_plan.php">Strategic Plan</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../organogram.php">Organogram</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../bestpractices.php">Best Practices</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../itpolicy.php">IT Policy</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../maintancepolicy.php">Maintenance Policy</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../awards.php">Awards</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../milestones.php">Milestones</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../nirfranking.php">Rankings</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../mous.php">MOUs</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../collegeundertaking.php">College Undertaking</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../photogallery.php">Photo Gallery</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../collegevideo.php">College Video</a></li>
      </ul>
    </div>
  </div>

  <div class="relative group">
    <button class="inline-flex items-center gap-1 hover:text-blue-200">Academics <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg></button>
    <div class="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow-lg rounded-md w-[22rem] p-2 z-50">
      <ul class="space-y-1">
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../academiccouncil.php">Academic Council</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Board of Studies <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-56 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../csebos.php">CSE BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../ecebos.php">ECE BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../civilbos.php">Civil BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../eeebos.php">EEE BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../mechanicalbos.php">Mechanical BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../itbos.php">IT BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../mcabos.php">MCA BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../mbabos.php">MBA BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../shbos.php">S&H BOS</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../previousyears">Previous Years</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../financecommittee.php">Finance committee</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Curriculum &amp; Syllabus <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-64 p-2">
            <div class="px-2 py-1 font-semibold text-sm">UG</div>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r14syllabusug.php">R-14 UG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r16syllabusug.php">R-16 UG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r19syllabusug.php">R-19 UG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r20syllabusug.php">R-20 UG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r23syllabusug.php">R-23 UG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r24syllabusug.php">R-24 UG Courses</a>
            <div class="px-2 py-1 font-semibold text-sm mt-2">PG</div>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r14syllabuspg.php">R-14 PG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r16syllabuspg.php">R-16 PG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r19syllabuspg.php">R-19 PG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r20syllabuspg.php">R-20 PG Courses</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../r24syllabuspg.php">R-24 PG Courses</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../committees.php">Committees</a></li>
      </ul>
    </div>
  </div>

  <div class="relative group">
    <button class="inline-flex items-center gap-1 hover:text-blue-200">Admissions <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg></button>
    <div class="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow-lg rounded-md w-[20rem] p-2 z-50">
      <ul class="space-y-1">
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Admission Manual <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-56 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../admissionmanual2019-20.php">A.Y 2019-20</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../admissionmanual2020-21.php">A.Y 2020-21</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../courses.php">Courses Offered</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../feestructure.php">Fee Structure</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Admission Procedure <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-56 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../ugadmissionproc.php">UG Admission</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../pgadmissionproc.php">PG Admission</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../admissionanalysis.php">Admission Analysis</a></li>
      </ul>
    </div>
  </div>

  <div class="relative group">
    <button class="inline-flex items-center gap-1 hover:text-blue-200">Departments <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg></button>
    <div class="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow-lg rounded-md w-[22rem] p-2 z-50">
      <div class="grid grid-cols-2 gap-2">
        <ul class="space-y-1">
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../cseabout.php">CSE</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../aimlabout.php">AI &amp; ML</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../csedsabout.php">CSE-Data Science</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../csebsabout.php">CSE-Business Systems</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../csecsabout.php">CSE-Cyber Security</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../cseaidsabout.php">AI&amp;DS</a></li>
        </ul>
        <ul class="space-y-1">
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../civilabout.php">Civil</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../eceabout.php">ECE</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../eeeabout.php">EEE</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../itabout.php">IT</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../mechabout.php">Mechanical</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../roboticsabout.php">Robotics</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../mbaabout.php">MBA</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../mcaabout.php">MCA</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../shabout.php">S&amp;H</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../bcaabout.php">BCA</a></li>
          <li><a class="block px-3 py-1 hover:bg-gray-100" href="../bbaabout.php">BBA</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="relative group">
    <button class="inline-flex items-center gap-1 hover:text-blue-200">R&amp;D <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg></button>
    <div class="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow-lg rounded-md w-[24rem] p-2 z-50">
      <ul class="space-y-1">
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../aboutresearch.php">About R&amp;D</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../sponsoredresearch.php">Sponsored Research</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchcunsultancy.php">Consultancy and Training Services</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchpublications.php">Publications</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Academic Research &amp; Facilities <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-56 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../cseresearch.php">CSE</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../mechanicalresearch.php">Mechanical</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../eceresearch.php">ECE</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../eeeresearch.php">EEE</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../civilresearch.php">Civil</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../mbaresearch.php">MBA</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../mcaresearch.php">MCA</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchpatents.php">Patents</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchcollabrartions.php">Collaborations and MoUs</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchpromotionpolicy.php">Policy for Promotion of Research</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchrevenuepolicy.php">Policy on Revenue Sharing</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchcentralfacility.php">Central Facility</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchstatisticaldatabase.php">Research/Statistical Database</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Nanotechnology Research Center <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-64 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../researchaboutnanotechnologyresearchcenter.php">About Center</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../researchfacultyincentives.php">Service Charges of Facilities</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchstartup.php">Start-Up</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchstateofethics.php">State code of Ethics</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchvideo.php">NRC Video</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../researchfacultyincentives.php">Faculty Research Incentives</a></li>
      </ul>
    </div>
  </div>

  <div class="relative group">
    <button class="inline-flex items-center gap-1 hover:text-blue-200">Placements <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg></button>
    <div class="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow-lg rounded-md w-[18rem] p-2 z-50">
      <ul class="space-y-1">
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../placementsabout.php">About</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../placementsmission.php">Mission</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../placementsfacilities.php">Facilities</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../placements_yearwise.php">Placement Status</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../placementstraining.php">Training</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../placementsgallery.php">Gallery</a></li>
      </ul>
    </div>
  </div>

  <div class="relative group">
    <button class="inline-flex items-center gap-1 hover:text-blue-200">Library <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg></button>
    <div class="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow-lg rounded-md w-[26rem] p-2 z-50">
      <ul class="space-y-1">
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../aboutlibrary.php">About Library</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../libraryinfrastructure.php">Infrastructure</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../libraryworkinghours.php">Working Hours</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../libraryrulesreg.php">Rules &amp; Regulations</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../librarystaff.php">Library Staff</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../librarydigital.php">Digital Library</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Journal <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-56 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../libraryprintjournals.php">Print Journals List</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../libraryboundedjournals.php">Bound volumes of Journals</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../libraryejournals.php">E-Journals</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../librarycdlist.php">List of CD's</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Book <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-56 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../librarybooks.php">Books</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../librarynewarrivals.php">New Arrivals</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../libraryrarebooks.php">Rare Books</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../libraryebooks.php">E-Books</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../libraryvideogallery.php">Video Gallery</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="http://portal.swarnandhra.ac.in:5000/" target="_blank">Previous year Question Papers Autonomous</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">E Subscriptions Access Links <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-64 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="https://ieeexplore.ieee.org/Xplore/home.jsp" target="_blank">IEEE Xplore</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="https://link.springer.com" target="_blank">Springer Link</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="https://www.jgateplus.com" target="_blank">J-Gate Plus</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="http://delnet.in/index.html" target="_blank">DELNET</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="https://nlist.inflibnet.ac.in/" target="_blank">N-List</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="https://ndl.iitkgp.ac.in" target="_blank">NDL</a>
          </div>
        </li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../data/librarybooksreform.pdf">Books Requisition Form</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../data/libfeedbackform.pdf">FeedBack Form</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="https://www.grammarly.com/plagiarism-checker" target="_blank">Plagiarism Software</a></li>
      </ul>
    </div>
  </div>

  <div class="relative group">
    <button class="inline-flex items-center gap-1 hover:text-blue-200">Facilities <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"/></svg></button>
    <div class="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow-lg rounded-md w-[22rem] p-2 z-50">
      <ul class="space-y-1">
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../atm.php">ATM</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../cafeteria.php">Cafeteria</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../wifi.php">WIFI</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../mediacentre.php">Media Centre</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../commonrooms.php">Common Rooms</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../smartclassrooms.php">ICT Enabled/Smart Classrooms</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../greeninitiatives.php">Green Initiatives</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../games.php">Games and Sports</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../languagelabs.php">Language Laboratories</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../waterplant.php">RO Water Plant</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../solarplant.php">Solar Power Plant</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../medicalfacility.php">Medical Facility</a></li>
        <li><a class="block px-3 py-1 hover:bg-gray-100" href="../hostel.php">Hostel</a></li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Transport <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-64 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../busroutes.php">Bus Routes (1st year exclusive)</a>
          </div>
        </li>
        <li class="relative">
          <div class="flex items-center justify-between px-3 py-1 font-medium">Safety Measures <span class="text-xs text-gray-500">›</span></div>
          <div class="absolute top-0 left-full ml-2 hidden group-hover:block bg-white text-gray-900 shadow rounded-md w-56 p-2">
            <a class="block px-2 py-1 hover:bg-gray-100" href="../firesafety.php">Fire safety</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../earthing.php">Earthing</a>
            <a class="block px-2 py-1 hover:bg-gray-100" href="../drivesafely.php">DRIVE SAFELY</a>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <a href="../teachingstaff.php" class="hover:text-blue-200">Teaching Staff</a>
  <a href="../nonteachingstaff.php" class="hover:text-blue-200">Non-Teaching Staff</a>
</nav>