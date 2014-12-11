#!/iiidb/software/tpp/bin/perl -w
use strict;

# version 380@(#) addjs.pl 380.3@(#) 02/14/12 13:08:47

##########################################################################
# <<addjs.pl>> adds the following javascript preceeding </head>
# for each *.html file in the local directory:
# <script type="text/javascript" src="/screens/iiilangswitch.js"></script>
##########################################################################

# global variables
my $insert_line = 0;
my $count = 0;
my $search = "^\<\/head\>";
my $addstring = '\<script type=\"text/javascript\" src=\"/screens/iiilangswitch.js\"\>\</script\>';

# log file
open LOG, ">>addjs.log" or die "$!";

# define print subroutine
sub lprint {
  my ($text) = @_;
  print LOG $text;  
  print $text;
}

##########################################################################
# Main
##########################################################################

# header
my $datetime = scalar(localtime(time));
lprint "-" x 55 . "\n";
lprint "addjs.pl - $datetime\n";
lprint "-" x 55 . "\n";

# create a list of all *.html files in the current directory
opendir(DIR, ".");
my @files = grep(/\.html$/,readdir(DIR));
closedir(DIR);

foreach my $filename (@files) # loop thru list
{

  # skip files containing iiilangswitch.js
  my $js_exists = `grep iiilangswitch.js "$filename"`;
  if ( $js_exists ) {
    next; 
  }

  # skip files not containing </head>
  my $hd_exists = `grep "$search" "$filename"`;
  if ( ! $hd_exists ) {
    next; 
  }

  # find </head>
  open(FH,$filename) or die "$!";
  while (<FH>) {
    if (/$search/) {
      $insert_line = $.;
	  last;
    }
  }
  close(FH);

  # insert javascript preceding </head>
  lprint "Updating $filename\n";
  system("perl -pi -le \'print \"$addstring\" if \$. == \'$insert_line\'\' \'$filename\'");
  if ( $? != 0 ) {
    lprint "Warning: '$filename' not updated\n";
  }
  else {
    $count++;
  }
}

lprint ">>> Script completed : $count files updated\n";
close(LOG);
